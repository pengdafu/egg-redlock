--[[
  1、获取锁的脚本
  2、采用锁大小控制并发

  Input:
    KEYS[1]: resource
    ARGV[1]: maxLokcer
    ARGV[2]: ttl
]]
local resource = KEYS[1]
local maxLokcer = tonumber(ARGV[1])
local ttl = tonumber(ARGV[2])

local rcall = redis.call -- 将redis.call 重命名为 rcall

local currentLockerNum = rcall('get', resource)

if rcall('EXISTS', resource) == 1 then
  currentLockerNum = tonumber(currentLockerNum)
else
  currentLockerNum = 0
end

if (currentLockerNum < maxLokcer) then
  return rcall('set', resource, currentLockerNum + 1, 'ex', ttl)
end
