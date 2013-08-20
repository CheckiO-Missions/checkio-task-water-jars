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
        {
            "input": [5, 7, 6],
            "answer": [10, 5, 7, 6],
            "explanation": ['02', '21', '10', '21', '02', '21', '10', '21', '02', '21']},
        {
            "input": [3, 4, 1],
            "answer": [2, 3, 4, 1],
            "explanation": ['02', '21']},
        {
            "input": [2, 1, 1],
            "answer": [1, 2, 1, 1],
            "explanation": ['02']},
        {
            "input": [8, 5, 2],
            "answer": [4, 8, 5, 2],
            "explanation": ['02', '21', '02', '21']},
        {
            "input": [9, 8, 7],
            "answer": [4, 9, 8, 7],
            "explanation": ['02', '21', '02', '21']},
        {
            "input": [8, 10, 4],
            "answer": [6, 8, 10, 4],
            "explanation": ['02', '21', '10', '21', '02', '21']},
        {
            "input": [2, 7, 1],
            "answer": [6, 2, 7, 1],
            "explanation": ['02', '21', '10', '21', '10', '21']},
        {
            "input": [5, 8, 7],
            "answer": [8, 5, 8, 7],
            "explanation": ['01', '12', '01', '12', '20', '12', '01', '12']}
    ],
    "Extra": [
        {
            "input": [9, 1, 6],
            "answer": [6, 9, 1, 6],
            "explanation": ['01', '12', '20', '12', '20', '12']},
        {
            "input": [7, 2, 4],
            "answer": [4, 7, 2, 4],
            "explanation": ['02', '21', '02', '21']},
        {
            "input": [8, 1, 4],
            "answer": [8, 8, 1, 4],
            "explanation": ['01', '12', '20', '12', '20', '12', '20', '12']}
    ]
}
