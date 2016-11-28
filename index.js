var Validation = require('data.validation')
var Success = Validation.Success
var Failure = Validation.Failure

var Maybe = require('data.maybe')
var Either = require('data.either')

function validateName(a) {
  return (a.name.length !== 0 ) 
  ? Success(a) 
  : Failure(["Name is empty"])
}

function nameLength50(a) {
  return (a.name.length <= 50 ) 
  ? Success(a) 
  : Failure(["name length must >= 50 characters"])
}

function emailNotBlank(a) {
  return (a.email.length !== 0 ) 
  ? Success(a) 
  : Failure(["email is empty"])
}

function isRequestValid(a) {
  return Success(function(x){ return function(y){ return function(z){ return a } }})
           .ap(validateName(a))
           .ap(nameLength50(a))
           .ap(emailNotBlank(a))
}

function eitherRequestValid(a) {
  return Either.fromValidation(isRequestValid(a))
}

function canonicalizeEmail(a) {
    a.email = "canonicalizeEmail";

    return Either.Right(a);
}

function updateDbFromRequest(a) {
    //do something here
    return Either.Right(a);
}

function sendEmail(a) {
    //do something here
    return Either.Right(a);
}

var request = new Object();
request.name = "jurnal";
request.email = "jurnal@email";

var d = Either
    .Right(request)
    .chain(eitherRequestValid)
    .chain(canonicalizeEmail)
    .chain(updateDbFromRequest)
    .chain(sendEmail)

console.log(d);

