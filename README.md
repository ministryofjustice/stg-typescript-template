# stg-typescript-template

A bootstrap template to create typescript clickable prototypes with deployment scripts to enable deployment on Cloud Platform hosting

## Useful links

- Cloud platform [guide](https://user-guide.cloud-platform.service.justice.gov.uk/#getting-started) has a great getting started section
- Cloud platform namespaces [stg example](https://github.com/ministryofjustice/cloud-platform-environments/pull/30165/files)
- [ask-cloud-platform](https://moj.enterprise.slack.com/archives/C57UPMZLY) slack channel (where PRs must be posted to environments)
- [cloud-platform-update](https://moj.enterprise.slack.com/archives/CH6D099DF) slack channel

## Why this isn't the HMPPS template

The template provided by HMPPS contains a specific helm chart and is part of an automated bootsstrap process only suitable for services supported and montiroed by HMPPS engineering teams. It expects redis and hmpps-auth integration which is not always appropriate.
This template is inspired by the HMPPS template though and is intended to be easily migratable.

## Customising for your own service

Some scripts and configurations need you to reflect your own service name or suitable value. Search for `REPLACE-ME` (**case insensitively**) to find where you need to do that

## running this locally

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

## git hook scripts

`precommit` will run lint, typescript compile and an npm audit check for earliest sight of security vulnerabilities

## optional extras

[Feature flags middleware](./server/middleware/featureFlags.ts) is available but not enabled. For initial prototyping this may not be necessary but could be useful in a pilot.
