# Concierge Itinerary Builder

A full-stack Next.js web application designed for a luxury hospitality concierge team to build, manage, and share bespoke itinerary proposals with members.

## Features

* **Concierge Dashboard**: Create itinerary items (dining, activities, etc.), assign dates and prices, and compile them into a draft proposal.
* **Proposal Management**: View a history of all proposals, track their statuses (Draft, Sent, Approved, Paid), and delete obsolete drafts.
* **Member Portal**: A dedicated, mobile-responsive view for members to review their proposed timeline, approve the itinerary, and submit payment.
* **Luxury UI**: A polished, high-end aesthetic tailored to luxury hospitality, featuring custom animations and editorial typography.

---

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (version 18 or higher)
* npm, yarn, or pnpm

### Setup Instructions

1.  **Clone the repository and install dependencies**:
    ```bash
    npm install
    ```

2.  **Initialize the Database**:
    ```bash
    npx prisma generate
    ```

3.  **Seed the Database**:
    ```bash
    npx prisma db seed
    ```

4.  **Start the Development Server**:
    ```bash
    npm run dev
    ```

### Accessing the Application

* **Concierge Dashboard**: Navigate to `http://localhost:3000`.
* **Member Proposal View**: From the dashboard, generate a proposal and click "Preview Member View" to access the dynamic route at `/proposal/[id]`.

---

## Technical Overview
* **Framework**: Next.js (App Router)
* **Database ORM**: Prisma
* **Styling**: Tailwind CSS (with custom theme configuration)

##Assumptions Made
* Authentication & Authorization: For the scope of this project, role-based access control (RBAC) is bypassed. Both the Concierge tools and the Member-facing views are accessible within the same local instance without logging in.
* Single Reservation Context: The dashboard currently defaults to a specific seeded reservation (e.g., James Whitfield). In a production environment, this dashboard would be wrapped in a layout that takes a specific reservationId parameter.
* Timezones: Dates and times are treated generally in the user's local timezone (or Mountain Standard Time, as mocked in the UI). Production timezone handling across different user locales would require a dedicated library like date-fns-tz.
* Mocked Actions: "Sending" the proposal simply updates the database status rather than firing an actual email. Similarly, "Paying" for the itinerary updates the status to trigger the confirmation view rather than hitting a payment gateway.

##What I Would Improve Given More Time
* Data Fetching & State Management: Migrate from manual useEffect fetching to a library like React Query or SWR. This would eliminate manual loading states, resolve race conditions, provide automatic caching, and simplify the refreshData logic.

* Authentication Integration: Implement NextAuth.js to secure the /api/proposals routes and separate the concierge dashboard from the member-facing portal.

- Real Integrations:
  - Integrate Stripe or another payment gateway for the member checkout flow.
  - Integrate an email provider like Resend to automatically email the member their unique proposal link when the Concierge clicks "Send to Member".

* Drag-and-Drop Itinerary Sorting: Allow the concierge to drag and drop draft items to reorder them before finalizing the proposal.

##What I Found Most Interesting or Challenging
* Controlled UI Components: Integrating Shadcn UI (Radix primitives) like the Accordion and react-day-picker required precise state management. Specifically, dealing with React hydration errors caused by nested interactive elements (e.g., placing a delete button inside an accordion trigger) was an interesting challenge in adhering to strict HTML/DOM standards.

* Full-Stack Next.js Paradigm: Seamlessly passing data between Server API routes (/api/proposals) and Client Components ("use client") while keeping the UI snappy required careful orchestration of Promise.all fetches and strategic React state updates to avoid cascading re-renders.

* Designing for Luxury: Shifting between the highly functional, data-dense Concierge Dashboard and the minimalist, editorial aesthetic of the Member Portal was an enjoyable UX challenge. Designing the final "Paid" confirmation state to feel like a high-end travel document required nuanced typography and spacing.
