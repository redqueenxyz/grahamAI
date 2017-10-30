(ns bot.buyer)
(require '[krak.client :as krak])

; (get-in (k/time) [:data "result" "unixtime"])
(def API-Key "KZXNBpYlkkFmzMmUhKMdpNmcJ1a3ZROrk+0joDdWIc5nGyHMhVT/aTZK")
(def API-Sign  "trMRQXSdQ4Ngz8ChHcQR0OnUiATd83wEDKMV7MxAT7FiG4dJa5NfT/10WnDOX0FHF/0h9umGo+mvNqsUJ/z4dA==")

(get-in (krak/asset-pairs :pair ["XBTCAD" "ETHCAD"]) [:data "result"])
; (krak/balance)

(get-in (krak/balance :api-key API-Key :api-secret API-Sign) [:data])

