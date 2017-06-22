'use strict';

var { Kind } = require('graphql/language');
var Validator = require('validator');
var checkUrl = require('valid_url');
var moment = require('moment');

var semverRegex = /^v?(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?$/; // modified from semver-regex to match exactly

/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */

module.exports = {
    date: {
        // parsing the request value from the client when the client sends the value embedded in the request body
        __parseLiteral(ast) { 
            if (ast.kind === Kind.STRING) {
                return new Date(ast.value)
            }
            return null;
        },
        // parsing the request value from the client when the client sends the value as a variable
        __parseValue(value) {
            return new Date(value); 

        },
        // value sent back to the client in the response
        __serialize(value) {
            return value.toISOString(); 
        }
    },
    
    uint: {
        // parsing the request value from the client when the client sends the value embedded in the request body
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
        // parsing the request value from the client when the client sends the value embedded in the request body
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
        // parsing the request value from the client when the client sends the value embedded in the request body
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
        // parsing the request value from the client when the client sends the value embedded in the request body
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
        // parsing the request value from the client when the client sends the value embedded in the request body
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
        // parsing the request value from the client when the client sends the value embedded in the request body
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
        // parsing the request value from the client when the client sends the value embedded in the request body
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
        // parsing the request value from the client when the client sends the value embedded in the request body
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
    },

    calendarDate: {
        // parsing the request value from the client when the client sends the value embedded in the request body
        __parseLiteral(ast) { 
            if (ast.kind === Kind.STRING) {
                return moment(ast.value, 'YYYY-MM-DD', true)
            }
            return null;
        },
        // parsing the request value from the client when the client sends the value as a variable
        __parseValue(value) {
            return moment(value, 'YYYY-MM-DD', true) 
        },
        // value sent back to the client in the response
        __serialize(value) {
            return moment(value).format('YYYY-MM-DD') 
        }
    },
    multiFormatDate: {
        // parsing the request value from the client when the client sends the value embedded in the request body
        __parseLiteral(ast) { 
            if (ast.kind === Kind.STRING) {
                return new Date(ast.value).getTime()
            }
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value)
            }
            return null;
        },
        // parsing the request value from the client when the client sends the value as a variable
        __parseValue(value) {
            return typeof value === 'string' ? new Date(value).getTime() : value
        },
        // value sent back to the client in the response
        __serialize(value) { 
            return value.toISOString(); 
        }
    },
    semanticVersion: {
        // parsing the request value from the client when the client sends the value embedded in the request body
        __parseLiteral(ast) {
            return semverRegex.test(ast.value) ? ast.value : null
        },
        // parsing the request value from the client when the client sends the value as a variable
        __parseValue(value) {
            return semverRegex.test(value) ? value : null
        },
        // value sent back to the client in the response
        __serialize(value) {
            return value
        }
    }
};
