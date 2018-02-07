'use strict';

var { GraphQLScalarType } = require('graphql');
var { Kind } = require('graphql/language');
var Validator = require('validator');
var checkUrl = require('valid_url');
var moment = require('moment');

var semverRegex = /^v?(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?$/; // modified from semver-regex to match exactly
var timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/ // HH:MM:SS or HH:MM
var dateRegex = /^(19|20)\d{2}-(0\d{1}|1[0-2])-([0-2]\d{1}|3[0-1])$/ // YYYY-MM-DD


function identity(x) { return x }


const CalendarDate = GraphQLScalarType({
    name: 'CalendarDate',
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new Error()
        }
        return moment(ast.value, 'YYYY-MM-DD', true)
    },
    parseValue(value) {
        return moment(value, 'YYYY-MM-DD', true)
    },
    serialize(value) {
        if (typeof value === 'string' && dateRegex.test(value)) {
            return value
        }
        return moment(value).format('YYYY-MM-DD')
    }
})

const Date = new GraphQLScalarType({
    name: 'Date',
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new Error()
        }
        return new Date(ast.value)
    },
    parseValue(value) {
        return new Date(value)
    },
    serialize(value) {
        return new Date(value).toISOString()
    }
})

const Email = new GraphQLScalarType({
    name: 'Email',
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new Error()
        }
        if (!Validator.isEmail(ast.value)) {
            throw new Error()
        }
        return ast.value.toLowerCase();
    },
    parseValue(value) {
        if (typeof value !== "string") {
            throw new Error()
        }
        if (!Validator.isEmail(value)) {
            throw new Error()
        }
        return value.toLowerCase();
    },
    serialize(value) {
        return value.toLowerCase();
    }
})

const Jwt = new GraphQLScalarType({
    name: 'Jwt',
    serialize: identity
})

const MultiFormatDate = new GraphQLScalarType({
    name: 'MultiFormatDate',
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value).getTime()
        }
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value)
        }
        throw new Error()
    },
    parseValue(value) {
        return typeof value === 'string' ? new Date(value).getTime() : value
    },
    serialize(value) {
        return value.toISOString();
    }
})

function validPassword(password) {
    return password.length > 8
}

const Password = new GraphQLScalarType({
    name: 'Password',
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new Error()
        }
        if (!validPassword(ast.value)) {
            throw new Error()
        }
        return ast.value
    },
    parseValue(value) {
        if (typeof value !== "string") {
            throw new Error()
        }
        if (!validPassword(value)) {
            throw new Error()
        }
        return value
    },
    serialize: identity
})

const SemanticVersion = new GraphQLScalarType({
    name: 'SemanticVersion',
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new Error()
        }
        if (!semverRegex.test(ast.value)) {
            throw new Error()
        }
        return ast.value
    },
    parseValue(value) {
        if (typeof value !== "string") {
            throw new Error()
        }
        if (!semverRegex.test(value)) {
            throw new Error()
        }
        return value
    },
    serialize: identity
})

const Time = new GraphQLScalarType({
    name: 'Time',
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new Error()
        }
        if (!timeRegex.test(ast.value)) {
            throw new Error()
        }
        return ast.value
    },
    parseValue(value) {
        if (typeof value !== "string") {
            throw new Error()
        }
        if (!timeRegex.test(value)) {
            throw new Error()
        }
        return value
    },
    serialize: identity
})

const Timestamp = new GraphQLScalarType({
    name: 'Timestamp',
    parseLiteral(ast) {
        if (ast.kind !== Kind.FLOAT) {
            throw new Error()
        }
        return parseFloat(ast.value)
    },
    parseValue(value) {
        if (typeof value !== "number") {
            throw new Error()
        }
        return value
    },
    serialize: identity
})

const Token = new GraphQLScalarType({
    name: 'Token',
    parseLiteral(ast) {
        return ast.value;
    },
    parseValue: identity,
    serialize: identity
})

const UInt = new GraphQLScalarType({
    name: 'UInt',
    parseLiteral(ast) {
        if (ast.kind !== Kind.INT) {
            throw new Error()
        }

        const intValue = parseInt(ast.value)
        if (intValue < 0) {
            throw new Error()
        }

        return intValue
    },
    parseValue(value) {
        if (value < 0) {
            throw new Error()
        }
        return value
    },
    serialize: identity
})

const Uri = new GraphQLScalarType({
    name: 'Uri',
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new Error()
        }
        if (!checkUrl(ast.value)) {
            throw new Error()
        }
        return ast.value
    },
    parseValue(value) {
        if (typeof value !== "string") {
            throw new Error()
        }
        if (!checkUrl(value)) {
            throw new Error()
        }
        return value
    },
    serialize: identity
})

module.exports = {
    CalendarDate,
    Date,
    Email,
    Jwt,
    MultiFormatDate,
    Password,
    SemanticVersion,
    Time,
    Timestamp,
    Token,
    UInt,
    Uri
}
