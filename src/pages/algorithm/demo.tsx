import React from 'react';
/**
 *示例 1：

 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 输出：[2,2]
 示例 2:

 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 输出：[4,9]

 来源：力扣（LeetCode）
 链接：https://leetcode-cn.com/problems/intersection-of-two-arrays-ii
 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * **/
const Intersect = function() {
  const intersect = function(nums1 = [], nums2 = []) {
    return nums1.filter(it => nums2.includes(it))
  }
  console.log(intersect([1,2,2,1], [2, 2]))
  return null;
}
export default Intersect
