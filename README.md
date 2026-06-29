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
