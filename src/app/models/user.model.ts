export class User {
    public name?: string;
    public email?: string;
    public gender?: string;
    public avatarUrl?: string;

}

export class Profile {
    public about?: string;
    public company?: string;
    public job?: string;
    public address?: string;
    public phone?: string;
    public country?: string;
    public linkedin?: string;
    public facebook?: string;
    public twitter?: string;
    public instagram?: string;
    public user?: User;

    public constructor(init?: Partial<Profile>) {
        Object.assign(this, init);
    }
}