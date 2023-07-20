module.exports = {
  hooks: {
    'before:init': ['pnpm build:plugin', 'pnpm zip'],
    'after:git:release': 'echo After git push, before github release',
    'after:release':
      'echo Successfully released ${name} v${version} to ${repo.repository}.',
  },
  git: {
    changelog: 'git log --pretty=format:"* %s (%h)" ${from}...${to}',
    requireCleanWorkingDir: true,
    requireBranch: false,
    requireUpstream: true,
    requireCommits: false,
    requireCommitsFail: true,
    commitsPath: '',
    addUntrackedFiles: false,
    commit: true,
    commitMessage: 'chore(release): v${version}',
    commitArgs: [],
    tag: true,
    tagExclude: null,
    tagName: null,
    tagMatch: null,
    getLatestTagFromAllRefs: false,
    tagAnnotation: 'Release ${version}',
    tagArgs: [],
    push: true,
    pushArgs: ['--follow-tags'],
    pushRepo: '',
  },
  npm: {
    publish: false,
    publishPath: '.',
    publishArgs: [],
    tag: null,
    otp: null,
    ignoreVersion: false,
    allowSameVersion: false,
    versionArgs: [],
    skipChecks: false,
    timeout: 10,
  },
  github: {
    release: true,
    releaseName: 'v${version}',
    releaseNotes(context) {
      // Remove the first, redundant line with version and date.
      return context.changelog.split('\n').slice(1).join('\n');
    },
    autoGenerate: false,
    preRelease: false,
    draft: false,
    tokenRef: 'GITHUB_TOKEN',
    assets: '*.zip',
    host: null,
    timeout: 0,
    proxy: null,
    skipChecks: false,
    web: false,
    comments: {
      submit: false,
      issue:
        ':rocket: _This issue has been resolved in v${version}. See [${releaseName}](${releaseUrl}) for release notes._',
      pr: ':rocket: _This pull request is included in v${version}. See [${releaseName}](${releaseUrl}) for release notes._',
    },
  },
  gitlab: {
    release: false,
    releaseName: 'Release ${version}',
    releaseNotes: null,
    milestones: [],
    tokenRef: 'GITLAB_TOKEN',
    tokenHeader: 'Private-Token',
    certificateAuthorityFile: null,
    assets: null,
    origin: null,
    skipChecks: false,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      preset: {
        name: 'conventionalcommits',
        types: [
          {
            type: 'feat',
            section: '✨ Features | 新功能',
          },
          {
            type: 'fix',
            section: '🐛 Bug Fixes | Bug 修复',
          },
          {
            type: 'chore',
            section: '👨‍💼 Chore | 构建/工程依赖/工具',
            hidden: true,
          },
          {
            type: 'docs',
            section: '📝 Documentation | 文档',
          },
          {
            type: 'style',
            section: '💅 Styles | 样式',
          },
          {
            type: 'refactor',
            section: '♻️ Code Refactoring | 代码重构',
          },
          {
            type: 'perf',
            section: '⚡ Performance Improvements | 性能优化',
          },
          {
            type: 'test',
            section: '🔍 Tests | 测试',
          },
          {
            type: 'revert',
            section: '⏪ Revert | 回退',
          },
          {
            type: 'build',
            section: '👷‍ Build System | 打包构建',
            hidden: true,
          },
          {
            type: 'ci',
            section: '🚧 Continuous Integration | CI 配置',
            hidden: true,
          },
          {},
        ],
      },
    },
  },
};
