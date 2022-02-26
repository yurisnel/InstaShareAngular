export interface INavItem {
    url: string;
    title: string;
    icon: string;
    subitems?: INavItem []
}
