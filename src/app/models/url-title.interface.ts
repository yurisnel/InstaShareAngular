export interface IBreadCrumb {
    label: string;
    url: string;
}
export interface IUrlTitle {
    url: string;
    title: string;
    breadCrumb?: IBreadCrumb[];
}
