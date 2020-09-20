import { getLastCommit as _getLastCommit, Commit } from 'git-last-commit'
import execa from 'execa'

const getLastCommit = (dst: string): Promise<Commit> =>
	new Promise((rs, rj) =>
		_getLastCommit(
			(err, commit) => {
				if (err) {
					return rj(err)
				}
				rs(commit)
			},
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			{ dst },
		),
	)

async function getShortHash() {
	const { shortHash } = await getLastCommit(__dirname)
	return shortHash
}

async function delivery(hash: string) {
	const exe = execa(`yarn workspaces foreach --exclude root npm publish --tag 0.0.0-${hash}`, {
		env: { FORCE_COLOR: 'true' },
	})
	exe.stdout?.pipe(process.stdout)
	exe.stderr?.pipe(process.stderr)
	await exe
}

async function main() {
	try {
		const shortHash = await getShortHash()
		delivery(shortHash)
	} catch (error) {
		console.error(error)
		process.exit(-1)
	}
}

main()
