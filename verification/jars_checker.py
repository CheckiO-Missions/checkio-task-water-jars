MAX_STEPS = None
FIRST_MAX = None
SECOND_MAX = None
GOAL = None

ACTIONS = {
    "01": lambda f, s: (FIRST_MAX, s),
    "02": lambda f, s: (f, SECOND_MAX),
    "12": lambda f, s: (
        f - (SECOND_MAX - s if f > SECOND_MAX - s else f),
        SECOND_MAX if f > SECOND_MAX - s else s + f),
    "21": lambda f, s: (

        FIRST_MAX if s > FIRST_MAX - f else s + f,
        s - (FIRST_MAX - f if s > FIRST_MAX - f else s),
    ),
    "10": lambda f, s: (0, s),
    "20": lambda f, s: (f, 0)
}


def checker(answer, result):
    global MAX_STEPS, FIRST_MAX, SECOND_MAX, GOAL
    MAX_STEPS, FIRST_MAX, SECOND_MAX, GOAL = answer
    # if not MAX_STEPS and result == []:
    #     return True, ""

    if not isinstance(result, (tuple, list)):
        return False, "Result must be a list."
    first, second = 0, 0
    if len(result) > MAX_STEPS:
        return False, "You answer contains too many steps. It can be shorter."
    for act in result:
        if act not in ACTIONS.keys():
            return False, "I don't know this action {0}".format(act)
        first, second = ACTIONS[act](first, second)
    if GOAL != first and GOAL != second:
        return False, "You did not reach the goal."
    return True, ""