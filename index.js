'use strict';

var Kind = require('graphql/language');
var Validator = require('validator');
var checkUrl = require('valid_url');
var JSONSchemaValidator = require('jsonschema');
/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */


module.exports = {

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
                if (validator.isEmail(ast.value)) {
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
                let validator = new JSONSchemaValidator.Validator();

                // validate payload with schema
                if (validator.validate(jwt.verify(ast, config.jwt.secret), jwtPayloadSchema).valid) {
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