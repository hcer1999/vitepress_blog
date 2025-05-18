---
title: 如何配置持续集成 (CI) 构建缓存
nav_title: CI 构建缓存
description: 学习如何配置 CI 以缓存 Next.js 构建
---

为了提高构建性能，Next.js 将缓存保存到 `.next/cache` 目录，该缓存可在多次构建之间共享。

要在持续集成 (CI) 环境中利用此缓存，需要配置 CI 工作流以正确地在构建之间持久化缓存。

> 如果你的 CI 未配置为在构建之间持久化 `.next/cache`，你可能会看到 [未检测到缓存](/docs/messages/no-cache) 错误。

以下是常见 CI 提供商的缓存配置示例：

## Vercel

Next.js 缓存已为你自动配置。你无需进行任何操作。如果你在 Vercel 上使用 Turborepo，[在此处了解更多](https://vercel.com/docs/monorepos/turborepo)。

## CircleCI

编辑 `.circleci/config.yml` 中的 `save_cache` 步骤，包含 `.next/cache`：

```yaml
steps:
  - save_cache:
      key: dependency-cache-{{ checksum "yarn.lock" }}
      paths:
        - ./node_modules
        - ./.next/cache
```

如果你没有 `save_cache` 键，请参考 CircleCI 的[构建缓存设置文档](https://circleci.com/docs/2.0/caching/)。

## Travis CI

将以下内容添加或合并到 `.travis.yml` 中：

```yaml
cache:
  directories:
    - $HOME/.cache/yarn
    - node_modules
    - .next/cache
```

## GitLab CI

将以下内容添加或合并到 `.gitlab-ci.yml` 中：

```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .next/cache/
```

## Netlify CI

使用 [Netlify 插件](https://www.netlify.com/products/build/plugins/) 中的 [`@netlify/plugin-nextjs`](https://www.npmjs.com/package/@netlify/plugin-nextjs)。

## AWS CodeBuild

将以下内容添加（或合并）到 `buildspec.yml` 中：

```yaml
cache:
  paths:
    - 'node_modules/**/*' # 缓存 `node_modules` 以加快 `yarn` 或 `npm i` 速度
    - '.next/cache/**/*' # 缓存 Next.js 以加快应用程序重建速度
```

## GitHub Actions

使用 GitHub 的 [actions/cache](https://github.com/actions/cache)，在工作流文件中添加以下步骤：

```yaml
uses: actions/cache@v4
with:
  # 查看这里了解关于使用 `yarn`、`bun` 或其他包管理器的缓存 https://github.com/actions/cache/blob/main/examples.md 或者你可以使用 actions/setup-node 进行缓存 https://github.com/actions/setup-node
  path: |
    ~/.npm
    ${{ github.workspace }}/.next/cache
  # 当包或源文件变更时生成新的缓存。
  key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx') }}
  # 如果源文件变更但包没有，从之前的缓存重建。
  restore-keys: |
    ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-
```

## Bitbucket Pipelines

在 `bitbucket-pipelines.yml` 的顶层（与 `pipelines` 同级）添加或合并以下内容：

```yaml
definitions:
  caches:
    nextcache: .next/cache
```

然后在管道的 `step` 的 `caches` 部分引用它：

```yaml
- step:
    name: your_step_name
    caches:
      - node
      - nextcache
```

## Heroku

使用 Heroku 的 [自定义缓存](https://devcenter.heroku.com/articles/nodejs-support#custom-caching)，在顶层 package.json 中添加 `cacheDirectories` 数组：

```javascript
"cacheDirectories": [".next/cache"]
```

## Azure Pipelines

使用 Azure Pipelines 的 [Cache 任务](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/cache)，在执行 `next build` 任务之前，将以下任务添加到管道 yaml 文件中：

```yaml
- task: Cache@2
  displayName: 'Cache .next/cache'
  inputs:
    key: next | $(Agent.OS) | yarn.lock
    path: '$(System.DefaultWorkingDirectory)/.next/cache'
```

## Jenkins (Pipeline)

使用 Jenkins 的 [Job Cacher](https://www.jenkins.io/doc/pipeline/steps/jobcacher/) 插件，在通常运行 `next build` 或 `npm install` 的 `Jenkinsfile` 中添加以下构建步骤：

```yaml
stage("Restore npm packages") {
    steps {
        // 基于 GIT_COMMIT 哈希将锁文件写入缓存
        writeFile file: "next-lock.cache", text: "$GIT_COMMIT"

        cache(caches: [
            arbitraryFileCache(
                path: "node_modules",
                includes: "**/*",
                cacheValidityDecidingFile: "package-lock.json"
            )
        ]) {
            sh "npm install"
        }
    }
}
stage("Build") {
    steps {
        // 基于 GIT_COMMIT 哈希将锁文件写入缓存
        writeFile file: "next-lock.cache", text: "$GIT_COMMIT"

        cache(caches: [
            arbitraryFileCache(
                path: ".next/cache",
                includes: "**/*",
                cacheValidityDecidingFile: "next-lock.cache"
            )
        ]) {
            // 即 `next build`
            sh "npm run build"
        }
    }
}
```
