export const commentPreReg = /(<!--|\/\/|\/\*)([\s]*)(#ifdef|#ifndef|#endif)([^\n]*)/gm
export const commentSufReg = /([^\n]*)(-->|\*\/)/gm
