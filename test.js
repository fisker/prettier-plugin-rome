import test from 'ava'
import * as prettier from 'prettier'
import outdent from 'outdent'
import languages from './languages.js'
import prettierPluginRome from './index.js'

function format(text, options = {}) {
  return prettier.format(text, {
    ...options,
    trailingComma: options.trailingComma ?? 'all',
    parser: 'rome',
    plugins: [prettierPluginRome],
  })
}

let snapshotCount = 0
async function snapshot(t, text, options) {
  return t.snapshot(
    {
      options,
      text,
      formatted: await format(text, options),
    },
    `snapshot-${(snapshotCount += 1)}`,
  )
}

async function snapshotError(t, text, options) {
  let error
  try {
    await format(text, options)
  } catch (formatError) {
    error = formatError
  }

  if (!error) {
    throw new Error('error expected')
  }

  const {message, loc, codeFrame} = error

  return t.snapshot(
    {
      options,
      text,
      message,
      loc,
      codeFrame,
    },
    `snapshot-${(snapshotCount += 1)} (error)`,
  )
}

test('format', async (t) => {
  await snapshot(t, 'foo()')

  // printWidth
  await Promise.all(
    [undefined, 5].map((printWidth) =>
      snapshot(t, 'foo.bar(1, 2)', {printWidth}),
    ),
  )

  // useTabs
  await Promise.all(
    [undefined, true, false].map((useTabs) =>
      snapshot(
        t,
        outdent`
          function foo() {
            bar()
          }
        `,
        {useTabs},
      ),
    ),
  )

  // tabWidth
  await Promise.all(
    [undefined, 2, 4].map((tabWidth) =>
      snapshot(
        t,
        outdent`
          function foo() {
            bar()
          }
        `,
        {tabWidth},
      ),
    ),
  )

  // singleQuote
  await Promise.all(
    [undefined, true, false].map((singleQuote) =>
      snapshot(t, 'foo("bar")', {singleQuote}),
    ),
  )

  // quoteProps
  await Promise.all(
    // eslint-disable-next-line unicorn/prevent-abbreviations
    [undefined, 'as-needed', 'consistent', 'preserve'].map((quoteProps) =>
      snapshot(t, 'foo = {0: 0, "a-b": "a-b", c: c, "d": d}', {quoteProps}),
    ),
  )

  // trailingComma
  await Promise.all(
    [undefined, 'all', 'es5', 'none'].flatMap((trailingComma) =>
      [undefined, 10].map((printWidth) =>
        snapshot(
          t,
          outdent`
            function foo(a, b) {
              console.log({a,b})
            }
          `,
          {trailingComma, printWidth},
        ),
      ),
    ),
  )

  // semi
  await Promise.all(
    [undefined, true, false].map((semi) => snapshot(t, '[].map(foo)', {semi})),
  )
})

test('languages', async (t) => {
  await snapshot(
    t,
    outdent`
      interface User {
        id: number
            firstName: string
        lastName: string
        role: string
      }

      function updateUser(id: number, update: Partial<User>) {
        const user = getUser(id)
            const newUser = { ...user, ...update }
        saveUser(id, newUser)
      }
    `,
  )

  await snapshot(
    t,
    outdent`
      import * as React from "react";

      interface UserThumbnailProps {img: string;
        alt: string;
            url: string;
      }

      export const UserThumbnail =
      (props: UserThumbnailProps) =>
        <a href={props.url}>
          <img src={props.img} alt={props.alt} />
        </a>
    `,
  )
})

test('invalid', async (t) => {
  await snapshotError(
    t,
    outdent`
      function a() {
        >>>
      }
    `,
  )
  await snapshotError(t, '1++', {filepath: 'unknown.unknown'})
})

test('file names', async (t) => {
  const filenames = languages.flatMap((language) => [
    ...(language.filenames ?? []),
    ...language.extensions.map((extension) => `source${extension}`),
  ])

  for (const filepath of filenames) {
    t.is(
      // eslint-disable-next-line no-await-in-loop
      await format('foo()', {filepath: `/${filepath}`}),
      'foo();\n',
      filepath,
    )
  }
})
