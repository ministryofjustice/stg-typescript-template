# stg-typescript-template

A bootstrap template to create typescript clickable prototypes with github action workflows to enable deployment on Cloud Platform hosting

## Why this isn't the HMPPS template

The template provided by HMPPS contains a specific helm chart and is part of an automated bootsstrap process only suitable for services supported and monitored by HMPPS engineering teams. It expects a custom domain name, redis and hmpps-auth integration which is not always appropriate.
This template is inspired by the HMPPS template though and is intended to be easily migratable.

## What this should NOT be used for

Any site to be integrated with internal data sources, this won't have the monitoring or network access for internal integrations and is not maintainable for use after a prototyping phase.

There are some url parameter driven behaviour to make the prototype journey work with minimal data and session which would never be appropriate for an integrated service.

## What you get out of the box

- password protection for the site to avoid unauthorised public usage
- one login mock journey for citizen authentication
- website session
- csrf and content security policies
- file upload, location check, camera and video capture javascript capabilities (wire up in your own custom controllers to use)
- basic unit tests
- basic cypress tests
- docker configuration
- kubernetes resource templates
- cloud platform deployment scripts
- next steps task list easter egg (run the site to find it)

## Git hook scripts

`precommit` will run lint, typescript compile and an npm audit check for earliest sight of security vulnerabilities

## Optional extras

[Feature flags middleware](./server/middleware/featureFlags.ts) is available but not enabled. For initial prototyping this may not be necessary but could be useful in a pilot.

## Running this locally

expected environment variables see .env.example file

```bash
# via npm
npm run start:dev
```

```bash
# via docker
docker compose up --build -d

docker compose down
```

```bash
# cli based cypress testing
docker compose up --build -d
npm run cypress:run
docker compose down
```

## Customising for your own service

Some scripts and configurations need you to reflect your own service name or suitable value. Search for `REPLACE-ME` (**case insensitively**) to find where you need to do that

Set the following Repository secrets

- POC_PASSWORD
- VALID_OTP e.g. 456123

## Setting up Cloud Platform environments

Using the cloud platform cli tool is straightforward and when creating a new namespace there will be interactive questions to answer. These cover how the site will be supported (slack channels in Justice Digital slack, team email addresses, github team name), MOJ department (financial budget), service name etc. It's worth having a Service Owner on hand to help you create and use the right details.

## Useful links

- [solution surgery](https://mojdt.slack.com/archives/C07Q7BEUVKK/p1745423915469119) Informal group of Technical Architects across Justice Digital and best place to bring ideas for discussion, and to meet the tech community with a vested interest. Start these conversations as early as you can!
- Cloud platform [guide](https://user-guide.cloud-platform.service.justice.gov.uk/#getting-started) has a great getting started section
- Cloud platform namespaces [stg example](https://github.com/ministryofjustice/cloud-platform-environments/pull/30165/files)
- [ask-cloud-platform](https://moj.enterprise.slack.com/archives/C57UPMZLY) Justice Digital slack channel (where PRs must be posted to environments)
- [cloud-platform-update](https://moj.enterprise.slack.com/archives/CH6D099DF) Justice Digital slack channel
