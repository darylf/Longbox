module Jwt
  module Blacklister
    module_function

    def blacklist!(jti:, exp:, user:)
      user.blacklisted_tokens.create!(
        jti: jti,
        exp: Time.zone.at(exp)
      )
    end

    def blacklisted?(jti:)
      BlacklistedToken.exists?(jti: jti)
    end
  end
end
