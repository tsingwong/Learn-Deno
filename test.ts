/*
 * @Description:
 * @Author: Tsingwong
 * @Date: 2021-01-28 17:18:25
 * @LastEditors: Tsingwong
 * @LastEditTime: 2021-01-28 17:36:15
 */
import { format } from "https://deno.land/std@0.84.0/datetime/mod.ts";

console.log(format(new Date(1611725895 * 1000), "yyyy-MM-dd HH:MM"));
