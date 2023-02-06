<?php

namespace App\ResponseUtil;

class ResponseUtil
{
    /**
     * @param string $message
     * @param mixed  $data
     *
     * @return array
     */
    public static function makeResponse($message, $data)
    {
        return [
            'success' => true,
            'data'    => $data,
            'message' => $message,
        ];
    }

    // public static function makeResponse($message, $data)
    // {
    //     return [
    //         'success' => true,
    //         'data'    => $data,
    //         'message' => $message,
    //     ];
    // }

    public static function makeResponseArray($message, $data, $array)
    {
        return [
            'success' => true,
            'data'    => $data,
            'array'   => $array,
            'message' => $message,
        ];
    }

    public static function makeResponseEnv($message, $data, $env)
    {
        return [
            'success' => true,
            'data'    => $data,
            'env'   => $env,
            'message' => $message,
        ];
    }

    /**
     * @param string $message
     * @param array  $data
     *
     * @return array
     */
    public static function makeError($message, array $data = [])
    {
        $res = [
            'success' => false,
            'message' => $message,
        ];

        if (!empty($data)) {
            $res['data'] = $data;
        }

        return $res;
    }
}
