(ns bot.buyer
  (:require [krak.client :as krak]))

; (get-in (k/time) [:data "result" "unixtime"])

; (get-in (krak/asset-pairs :pair ["XBTCAD" "ETHCAD"]) [:data "result"])
; (krak/balance)



(get-in (krak/balance API-Key API-Sign) [:data])

(defn greeting [greet]
  (str greet "World!"))

(greeting "Hello")