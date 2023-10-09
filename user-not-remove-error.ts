/*aline nataly-164905
poo*/

export class UserNotRemoveError extends Error {
    public readonly name = 'UserNotRemoveError'

    constructor() {
        super('User Not Remove.')
    }
}
