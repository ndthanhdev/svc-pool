// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as core from '@svc-pool/core'

declare module '@svc-pool/core/registry' {
	export default interface Registry {
		nested2: string[]
	}
}
