(require '[krak.client :as k])

(get-in (k/time) [:data "result" "unixtime"])

