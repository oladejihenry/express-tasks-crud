Feature: Task API

    Scenario: Create a new task
        Given I have no tasks
        When I create a task
        Then I should see the task
    
    Scenario: Get all tasks
        Given I have a task
        When I get all tasks
        Then I should see the task

    Scenario: Update a task
        Given I have a task
        When I update the task
        Then I should see the task

    Scenario: Delete a task
        Given I have a task
        When I delete the task
        Then I should see the task

  