export const _$ = (id) => document.getElementById(id)
export const _$l = (query) => document.querySelector(query)
export const _$ll = (query) => document.querySelectorAll(query)
export const _pn = (el) => el.parentNode;
export const _pn2 = (el) => el.parentNode.parentNode;
export const _pn3 = (el) => el.parentNode.parentNode.parentNode;
export const _pl = (el) => el.parentElement;
export const _pl2 = (el) => el.parentElement.parentElement;
export const _pl3 = (el) => el.parentElement.parentElement.parentElement;
export const _chd = (el) => el.children;

export default {
    _$, _$l, _$ll, _pn, _pn2, _pn3, _pl, _pl2, _pl3, _chd
}