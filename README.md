# Concierge Itinerary Builder

A full-stack Next.js web application designed for a luxury hospitality concierge team to build, manage, and share bespoke itinerary proposals with members.

## Features

- **Concierge Dashboard**: Create itinerary items (dining, activities, etc.), assign dates and prices, and compile them into a draft proposal.
- **Proposal Management**: View a history of all proposals, track their statuses (Draft, Sent, Approved, Paid), and delete obsolete drafts.
- **Member Portal**: A dedicated, mobile-responsive view for members to review their proposed timeline, approve the itinerary, and submit payment.
- **Luxury UI**: A polished, high-end aesthetic tailored to luxury hospitality, featuring custom animations and editorial typography.

---

## How to Install and Run Locally

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Setup Instructions

1. **Clone the repository and install dependencies**

```bash
   npm install
```

2. **Set up the Database**

```bash
   npx prisma generate
```

3. **Seed the Database**

```bash
   npx prisma db seed
```

4.	**Serve NextJS

```bash
   npm run dev
```
•	Concierge Dashboard: http://localhost:3000
•	Member Proposal View: Open the dashboard, generate a proposal, and click "Preview Member View" to see the dynamic route (/proposal/[id]).
