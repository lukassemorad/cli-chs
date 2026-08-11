import { Course } from './course.model';
import { EnrolledUser } from './enrolled-user.model';

const NAME_POOL: { name: string; email: string }[] = [
  { name: 'Jana Nováková', email: 'jana.novakova@example.cz' },
  { name: 'Petr Svoboda', email: 'petr.svoboda@example.cz' },
  { name: 'Eva Dvořáková', email: 'eva.dvorakova@example.cz' },
  { name: 'Tomáš Černý', email: 'tomas.cerny@example.cz' },
  { name: 'Lucie Procházková', email: 'lucie.prochazkova@example.cz' },
  { name: 'Jakub Krejčí', email: 'jakub.krejci@example.cz' },
  { name: 'Kateřina Horáková', email: 'katerina.horakova@example.cz' },
  { name: 'Martin Němec', email: 'martin.nemec@example.cz' },
  { name: 'Barbora Marková', email: 'barbora.markova@example.cz' },
  { name: 'David Pokorný', email: 'david.pokorny@example.cz' },
  { name: 'Tereza Fialová', email: 'tereza.fialova@example.cz' },
  { name: 'Ondřej Beneš', email: 'ondrej.benes@example.cz' },
  { name: 'Klára Sedláčková', email: 'klara.sedlackova@example.cz' },
  { name: 'Michal Král', email: 'michal.kral@example.cz' },
  { name: 'Adéla Kučerová', email: 'adela.kucerova@example.cz' },
  { name: 'Filip Veselý', email: 'filip.vesely@example.cz' },
  { name: 'Nikola Urbanová', email: 'nikola.urbanova@example.cz' },
  { name: 'Vojtěch Doležal', email: 'vojtech.dolezal@example.cz' },
  { name: 'Simona Kadlecová', email: 'simona.kadlecova@example.cz' },
  { name: 'Jiří Šimek', email: 'jiri.simek@example.cz' },
];

function courseIndexSeed(course: Course): number {
  return course.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

export function getEnrolledUsersForCourse(course: Course): EnrolledUser[] {
  const offset = courseIndexSeed(course) % NAME_POOL.length;
  const deadline = new Date(course.registrationDeadline);

  return Array.from({ length: course.capacityRegistered }, (_, i) => {
    const person = NAME_POOL[(offset + i) % NAME_POOL.length];
    const registeredAt = new Date(deadline);
    registeredAt.setDate(registeredAt.getDate() - (i + 1));

    return {
      name: person.name,
      email: person.email,
      registeredAt: registeredAt.toISOString(),
      status: i % 6 === 5 ? 'čeká na platbu' : 'zaplaceno',
    };
  });
}
