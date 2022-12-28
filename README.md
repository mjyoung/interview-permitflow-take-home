# Michael Young X PermitFlow Take Home

I’ve deployed the application to Vercel [here](https://michaelyoung-permitflow-take-home.vercel.app/).

Frontend routes at:
```
/                         Root/index page to select municipality (accessible from header)
/municipalities/[slug]    Flow to submit a job request for a specific municipality
/job-requests             List all submitted job requests (accessible from header)
/job-requests/[id]        List a specific job request
```

Note: I am using [Neon.tech](https://neon.tech/)’s free tier for Postgres so please let me know if the web app has any issues accessing the data.


## Tech Stack

### Frontend

* Next.js (React + TypeScript) deployed to Vercel
* Tailwind CSS
* Zustand for global app state

### Backend

* API routes using [Next.js API routes](https://nextjs.org/docs/api-routes/introduction)
* Postgres DB hosted on [Neon.tech](https://neon.tech/)
* Prisma ORM

## Running Locally

1. Clone down the repo.
2. Add a `.env.development.local` file as per [Next.js's docs](https://nextjs.org/docs/basic-features/environment-variables). Add your `DATABASE_URL` in this file as it is required for Prisma to work.
3. Run the following to prepare the database:
  ```
  yarn prisma:generate
  yarn db:migrate:dev
  yarn db:seed
  ```
4. `yarn dev` to launch the app locally.

## Todo / Potential Improvements

* Make web app mobile responsive.
* Cache results in redis (municipalities, permit rules). Update cache on create/update.
* More try/catch, handle error states.
* Paginate job request list.
* Write tests.