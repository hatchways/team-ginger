# Some convenience functions to ensure consistent response data (no typos in response tags)
from flask import make_response, jsonify

_RESPONSE_TAG = 'response'


def bad_request_response(message: str):
    response = make_response(jsonify({_RESPONSE_TAG: message}), 400)
    return response


def created_response(message: str):
    response = make_response(jsonify({_RESPONSE_TAG: message}), 201)
    return response


def ok_response(message: str):
    response = make_response(jsonify({_RESPONSE_TAG: message}), 200)
    return response


def error_response(message: str):
    response = make_response(jsonify({_RESPONSE_TAG: message}), 500)
    return response
