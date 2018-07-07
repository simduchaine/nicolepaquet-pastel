# encoding: utf-8
require 'date'
require 'time'
Date::MONTHNAMES = [nil] + %w(janvier février mars avril mai juin juillet août septembre octobre novembre décembre)
Date::DAYNAMES = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

class Time
    alias :strftime_nolocale :strftime

    def strftime(format)
        format = format.dup
        format.gsub!(/%a/, Date::ABBR_DAYNAMES[self.wday])
        format.gsub!(/%A/, Date::DAYNAMES[self.wday])
        format.gsub!(/%b/, Date::ABBR_MONTHNAMES[self.mon])
        format.gsub!(/%B/, Date::MONTHNAMES[self.mon])
        self.strftime_nolocale(format)
    end
end