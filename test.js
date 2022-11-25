import assert from 'node:assert/strict'
import test from 'node:test'
import * as prettier from 'prettier'
import outdent from 'outdent'
import prettierPluginRome from './index.js'

function format(text, options) {
  return prettier.format(text, {
    ...options,
    parser: 'rome',
    plugins: [prettierPluginRome],
  })
}

let snapshotCount = 0
async function snapshot(text, options) {
  return assert.snapshot(
    {
      options,
      text,
      formatted: await format(text, options),
    },
    `snapshot-${(snapshotCount += 1)}`,
  )
}

test('format', async () => {
  await snapshot('foo()')

  // printWidth
  await Promise.all(
    [undefined, 5].map((printWidth) => snapshot('foo.bar(1, 2)', {printWidth})),
  )

  // useTabs
  await Promise.all(
    [undefined, true, false].map((useTabs) =>
      snapshot(
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
      snapshot('foo("bar")', {singleQuote}),
    ),
  )

  // quoteProps
  await Promise.all(
    // eslint-disable-next-line unicorn/prevent-abbreviations
    [undefined, 'as-needed', 'consistent', 'preserve'].map((quoteProps) =>
      snapshot('foo = {0: 0, "a-b": "a-b", c: c, "d": d}', {quoteProps}),
    ),
  )

  // trailingComma
  await Promise.all(
    [undefined, 'all', 'es5', 'none'].flatMap((trailingComma) =>
      [undefined, 10].map((printWidth) =>
        snapshot(
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

  // // semi
  // await Promise.all(
  //   [undefined, true, false].map((semi) => snapshot('[].map(foo)', {semi})),
  // )
})

test('languages', async () => {
  await snapshot(outdent`
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
  `)

  await snapshot(outdent`
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
  `)
})
