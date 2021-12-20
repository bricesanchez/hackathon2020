class ExampleComponent < ViewComponentReflex::Component
  def initialize
    @count = 0
  end

  def increment
    @count += 1
  end

  def self.stimulus_controller
    "example-component--example-component"
  end
end