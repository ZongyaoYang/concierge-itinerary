import { db as prisma } from "../src/lib/db";

async function main() {
  await prisma.sentEmail.deleteMany();
  await prisma.proposalItem.deleteMany();
  await prisma.proposal.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.member.deleteMany();

  const member = await prisma.member.create({
    data: {
      name: "James Whitfield",
      email: "james.whitfield@example.com",
    },
  });

  await prisma.reservation.create({
    data: {
      member_id: member.id,
      destination: "Punta Mita, Mexico",
      villa: "Villa Punta Mita",
      arrival_date: new Date("2027-03-15T00:00:00Z"),
      departure_date: new Date("2027-03-22T20:00:00Z"),
    },
  });

  console.log("Seed date created!");
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
