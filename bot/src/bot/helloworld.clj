(ns bot.core)

(:require
 [dotenv.core :as env])

(enable-console-print!)

(println (:kkey env))
(println "Hello world!")