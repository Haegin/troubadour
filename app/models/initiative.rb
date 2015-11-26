class Initiative
  include Mongoid::Document
  field :result, type: Integer
  field :name, type: String

  def to_hash
    {
      id: _id.to_s,
      name: name,
      result: result,
    }
  end
end
