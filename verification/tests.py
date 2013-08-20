"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {"input": [5, 7, 6],
         "answer": [10, 5, 7, 6],
         "explanation": ['02', '21', '10', '21', '02', '21', '10', '21', '02', '21']},
        {"input": [3, 4, 1],
         "answer": [2, 3, 4, 1],
         "explanation": ['02', '21']},
        {"input": [3, 4, 1],
         "answer": [1, 3, 4, 1],
         "explanation": ['02']},
        {"input": [3, 4, 1],
         "answer": [2, 3, 4, 1],
         "explanation": ['02', '21']},
        {"input": [3, 4, 1],
         "answer": [10, 3, 4, 1],
         "explanation": ['02', '21', '10', '21', '10', '21', '02', '21', '10', '21']},
        {"input": [3, 4, 1],
         "answer": [8, 3, 4, 1],
         "explanation": ['01', '12', '20', '12', '20', '12', '01', '12']},
        {"input": [3, 4, 1],
         "answer": [4, 3, 4, 1],
         "explanation": ['01', '12', '01', '12']},
    ],
    "Extra": [
        {"input": [3, 4, 1],
         "answer": [14, 3, 4, 1],
         "explanation": ['02', '21', '10', '21', '02', '21', '10', '21', '02', '21', '10', '21',
                         '02', '21']},
        {"input": [9, 6, 3],
         "answer": [2, 9, 6, 3],
         "explanation": ['01', '12']},
        {"input": [6, 5, 5],
         "answer": [1, 6, 5, 5],
         "explanation": ['02']},
        {"input": [3, 5, 1],
         "answer": [4, 3, 5, 1],
         "explanation": ['01', '12', '01', '12']},
        {"input": [8, 5, 1],
         "answer": [8, 8, 5, 1],
         "explanation": ['01', '12', '20', '12', '01', '12', '20', '12']},
    ]
}
