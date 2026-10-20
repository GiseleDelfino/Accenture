Feature: DemoQA Web Tables

  Scenario: Create and delete twelve dynamically generated records
    Given I am on the DemoQA Web Tables page
    When I create 12 dynamically generated records
    Then all 12 generated records should be visible
    When I delete all generated records
    Then none of the generated records should remain
