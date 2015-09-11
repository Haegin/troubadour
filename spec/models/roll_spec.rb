require "spec_helper"

describe Roll do
  it "can count successes" do
    expect(Roll.new({tn: 6, results: [2, 4]}).successes).to eq 0
    expect(Roll.new({tn: 6, results: [2, 3, 6]}).successes).to eq 1
    expect(Roll.new({tn: 6, results: [2, 6, 9]}).successes).to eq 2
  end

  it "penalises 1s" do
    expect(Roll.new({tn: 6, results: [1, 3, 6]}).successes).to eq 0
    expect(Roll.new({tn: 6, results: [1, 4, 7, 9]}).successes).to eq 1
  end

  it "is a botch when there are fewer than 0 successes" do
    expect(Roll.new({tn: 6, results: [1]}).successes).to eq :botch
  end

  it "decides success based on the target number" do
    expect(Roll.new({tn: 3, results: [3, 4]}).successes).to eq 2
    expect(Roll.new({tn: 7, results: [5, 6, 7]}).successes).to eq 1
    expect(Roll.new({tn: 10, results: [7, 9, 10]}).successes).to eq 1
  end
end
