class Roll
  include Mongoid::Document
  field :target, type: Integer
  field :results, type: Array
  field :roller, type: String

  def successes
    total = results.count { |r| r >= target } - results.count { |r| r == 1 }
    total >= 0 ? total : :botch
  end

  def pool
    results.count
  end

  def to_hash
    {
      id: _id.to_s,
      pool: pool,
      target: target,
      results: results,
      successes: successes,
      roller: roller,
    }
  end
end
