export interface IBreadCrums {
    label: string;
    url: string;
}
export interface IUrlTitle {
    url: string;
    title: string;
    breadCrums?: IBreadCrums[];
}
