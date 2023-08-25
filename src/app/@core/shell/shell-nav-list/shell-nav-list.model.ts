export type ShellNavListItem = {
  id: string;
  routerLink: string | string[];
  label: string;
  queryParams?: { site: string };
};
