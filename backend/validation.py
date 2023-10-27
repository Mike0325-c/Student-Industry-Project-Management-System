from schema import Schema, And, Use, Optional, Or
from re import fullmatch

EMAIL_REGEX = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"
pass_port_list = ["EH6727996", "EH6727995", "EH6727994", "EH6727993", "EH6727992"]


def is_email(email_address):
    return fullmatch(EMAIL_REGEX, email_address)


def is_passport(passport):
    return passport in pass_port_list


SEND_CODE_SCHEMA = Schema(
    {

        "email": And(str, len, is_email),
    }
)

REGISTER_SCHEMA = Schema(
    {
        "name": And(str, len),
        "password": And(str, len),
        "code": And(str, len),
        "email": And(str, len, is_email),
        "role": And(Use(int), lambda i: i >= 0),
        "passport": And(str, len, is_passport),
    }
)

LOGIN_SCHEMA = Schema(
    {
        "email": And(str, len, is_email),
        "password": And(str, len),

    }
)

VERIFY_CODE_SCHEMA = Schema(
    {
        "email": And(str, len, is_email),
        "code": And(str, len),
    }
)

RESET_PASSWORD_SCHEMA = Schema(
    {
        "password": And(str, len),
    }
)

UPDATE_PROFILE_SCHEMA = Schema(
    {
        "name": And(str, len),
        Optional("work_rights"): Or([str], lambda x: x == "", None),
        Optional("passport"): Or(str, lambda x: x == "", None),
        Optional("avatarUrl"): Or(str, lambda x: x == "", None),
        Optional("skill"): Or(str, lambda x: x == "", None),
    }
)

CREATE_PROJECT_SCHEMA = Schema(
    {
        "title": And(str, len),
        "location": And(str, len),
        "job_classification": And(Use(int), lambda i: i >= 0),
        "problem_statement": And(str, len),
        "requirement": And(str, len),
        "payment_type": And(Use(int), lambda i: i >= 0),
        "opportunity_type": And(Use(int), lambda i: i >= 0),
        Optional("desired_outcomes"): Or(str, lambda x: x == "", None),
        Optional("required_skill"): Or(str, lambda x: x == "", None),
        Optional("potential_deliverable"): Or(str, lambda x: x == "", None),
        Optional("expected_delivery_cycle"): Or(str, lambda x: x == "", None),
    })

UPDATE_PROJECT_SCHEMA = Schema(
    {
        "id": And(Use(int), lambda i: i >= 0),
        Optional("title"): And(str, len),
        Optional("location"): And(str, len),
        Optional("job_classification"): And(Use(int), lambda i: i >= 0),
        Optional("problem_statement"): And(str, len),
        Optional("requirement"): And(str, len),
        Optional("payment_type"): And(Use(int), lambda i: i >= 0),
        Optional("opportunity_type"): And(Use(int), lambda i: i >= 0),
        Optional("desired_outcomes"): Or(str, lambda x: x == "", None),
        Optional("required_skill"): Or(str, lambda x: x == "", None),
        Optional("potential_deliverable"): Or(str, lambda x: x == "", None),
        Optional("expected_delivery_cycle"): Or(str, lambda x: x == "", None),
    }
)

GET_TASKS_SCHEMA = Schema(
    {
        Optional("keyword"): And(str, len),
        Optional("location"): And(str, len),
        Optional("job_classification"): And(Use(int), lambda i: i >= 0),
    }
)
