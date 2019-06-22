--[[
  1、解锁，实际上是把锁大小减一
  
  Input: 
    KEYS[1]: resource
    ARGV[1]: ttl
]]

local resource = KEYS[1]
local ttl = tonumber(ARGV[1])
local rcall = redis.call
local currentLockerNum = rcall('get', resource)
if rcall('EXISTS', resource) == 1 then
  currentLockerNum = tonumber(currentLockerNum)
else 
  currentLockerNum = nil
end
if ( currentLockerNum and currentLockerNum > 0) then
  rcall('set', resource, currentLockerNum - 1, 'ex', ttl)
end
