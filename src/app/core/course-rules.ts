import { formatDate } from '@angular/common';
import { AuthUser } from './auth.service';
import { Course, freeSpots } from './course.model';

export type RuleKey = 'membership' | 'age' | 'qualification' | 'capacity' | 'deadline';

export interface RuleResult {
  key: RuleKey;
  label: string;
  detail: string;
  passed: boolean;
}

export function getCourseRules(course: Course): RuleResult[] {
  return [
    {
      key: 'membership',
      label: 'Členství / registrace',
      detail: course.requiresMembership ? 'Vyžadováno' : 'Nevyžadováno',
      passed: course.requiresMembership,
    },
    {
      key: 'age',
      label: 'Minimální věk',
      detail: course.requiresAdult ? 'Vyžadována plnoletost (18+)' : 'Bez věkového omezení',
      passed: course.requiresAdult,
    },
    {
      key: 'qualification',
      label: 'Požadovaná kvalifikace',
      detail: course.requiresQualification ? 'Vyžadována' : 'Není vyžadována',
      passed: course.requiresQualification,
    },
    {
      key: 'capacity',
      label: 'Volná místa',
      detail: `${freeSpots(course)} z ${course.capacityTotal}`,
      passed: freeSpots(course) > 0,
    },
    {
      key: 'deadline',
      label: 'Uzávěrka přihlášek',
      detail: formatDate(course.registrationDeadline, 'd. M. yyyy', 'en-US'),
      passed: new Date() <= new Date(course.registrationDeadline),
    },
  ];
}

export function evaluateCourseRules(course: Course, user: AuthUser): RuleResult[] {
  const membershipOk = !course.requiresMembership || user.isMember;
  const ageOk = !course.requiresAdult || user.isAdult;
  const qualificationOk = !course.requiresQualification || user.hasQualification;
  const freeSpotsCount = freeSpots(course);
  const capacityOk = freeSpotsCount > 0;
  const deadlineOk = new Date() <= new Date(course.registrationDeadline);

  return [
    {
      key: 'membership',
      label: 'Členství / registrace',
      detail: !course.requiresMembership
        ? 'Členství se pro tento kurz nevyžaduje.'
        : membershipOk
          ? 'Splňujete podmínku členství.'
          : 'Chybí aktivní členství / registrace.',
      passed: membershipOk,
    },
    {
      key: 'age',
      label: 'Minimální věk',
      detail: !course.requiresAdult
        ? 'Věkové omezení se pro tento kurz nevyžaduje.'
        : ageOk
          ? 'Splňujete podmínku plnoletosti.'
          : 'Vyžadována plnoletost (18+).',
      passed: ageOk,
    },
    {
      key: 'qualification',
      label: 'Požadovaná kvalifikace',
      detail: !course.requiresQualification
        ? 'Kvalifikace se pro tento kurz nevyžaduje.'
        : qualificationOk
          ? 'Splňujete požadovanou kvalifikaci.'
          : 'Chybí požadovaná kvalifikace.',
      passed: qualificationOk,
    },
    {
      key: 'capacity',
      label: 'Volná místa',
      detail: capacityOk
        ? `Volná místa: ${freeSpotsCount} z ${course.capacityTotal}.`
        : 'Kurz je plně obsazen.',
      passed: capacityOk,
    },
    {
      key: 'deadline',
      label: 'Uzávěrka přihlášek',
      detail: deadlineOk
        ? 'Uzávěrka přihlášek ještě neproběhla.'
        : 'Uzávěrka přihlášek již vypršela.',
      passed: deadlineOk,
    },
  ];
}
