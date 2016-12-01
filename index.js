'use strict';

/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */

var code = {
        __parseLiteral(ast) {
            return ast.value;
        },
        __parseValue(value) {
            return value;
        },
        __serialize(value) {
            return value;
        }
    };

 var token = {
        __parseLiteral(ast) {
            return ast.value;
        },
        __parseValue(value) {
            return value;
        },
        __serialize(value) {
            return value;
        }
    };
 var email: {
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
    }

 var jwt = {
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
    };
var password = {
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
    };