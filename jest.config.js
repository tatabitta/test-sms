module.exports = {
  testRegex: '/test/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'js'],
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node'
};