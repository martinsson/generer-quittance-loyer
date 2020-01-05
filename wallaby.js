module.exports = function (wallaby) {
    return {
        files: [
            'src/**/*.js'
        ],

        tests: [
            'test/**/*.spec.js',
            '!test/generate_quittance.spec.js'
        ],

        testFramework: 'mocha',
        env: {
            type: 'node'
        }
    };
};
