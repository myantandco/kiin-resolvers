'use strict';

var { Kind } = require('graphql/language');
var Validator = require('validator');
var checkUrl = require('valid_url');
/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */


module.exports = {
    date: {
        __parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return ast.value;
            }
            return null;
        },
        __parseValue(value) {
            return new Date(value);
        },
        __serialize(value) {
            return value;
        }
    },
    
    uint: {
        __parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                if (ast.value >= 0) {
                    return ast.value;
                }
            }
            return null;
        },
        __parseValue(value) {
            return value;
        },
        __serialize(value) {
            return value;
        }
    },
    
    pageSize: {
        __parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                if (ast.value >= 0 && ast.value <= 100) {
                    return ast.value;
                }
            }
            return null;
        },
        __parseValue(value) {
            return value;
        },
        __serialize(value) {
            return value;
        }
    },
    
    code: {
        __parseLiteral(ast) {
            return ast.value;
        },
        __parseValue(value) {
            return value;
        },
        __serialize(value) {
            return value;
        }
    },

    token: {
        __parseLiteral(ast) {
            return ast.value;
        },
        __parseValue(value) {
            return value;
        },
        __serialize(value) {
            return value;
        }
    },

    email: {
        __parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                if (Validator.isEmail(ast.value)) {
                    return ast.value.toLowerCase();
                }
            }
            return null;
        },
        __parseValue(value) {
            return value.toLowerCase();
        },
        __serialize(value) {
            return value.toLowerCase();
        }
    },

    url: {
        __parseLiteral(ast) {
            if (checkUrl(ast.value)) {
                return ast.value;
            }
            return null;
        },
        __parseValue(value) {
            return value;
        },
        __serialize(value) {
            return value
        }
    },

    jwt: {
        __parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                    return ast.value;
            }
            return null;
        },
        __parseValue(value) {
            return value;
        },
        __serialize(value) {
            return value;
        }
    },

    password: {
        __parseLiteral(ast) {
            if (ast.value.length > 8) {
                return ast.value;
            }
            return null;
        },
        __parseValue(value) {
            return value;
        },
        __serialize(value) {
            return value
        }
    }
};
