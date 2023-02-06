<?php

namespace App\Http\Controllers;

use App\ResponseUtil\ResponseUtil;
use Response;

/**
 * @SWG\Swagger(
 *   basePath="/api/v1",
 *   @SWG\Info(
 *     title="Laravel Generator APIs",
 *     version="1.0.0",
 *   )
 * )
 * This class should be parent class for other API controllers
 * Class AppBaseController
 */
class AppBaseController extends Controller
{
    /**
     * @param $result
     *
     * @param $message
     *
     * @return mixed
     */
    public function sendResponse($result, $message)
    {
        return Response::json(ResponseUtil::makeResponse($message, $result));
    }

    public function sendResponseArray($result, $message, $array)
    {
        return Response::json(ResponseUtil::makeResponseArray($message, $result, $array));
    }

    public function sendResponseEnv($result, $message, $env)
    {
        return Response::json(ResponseUtil::makeResponseEnv($message, $result, $env));
    }

    /**
     * @param $error
     *
     * @param  int  $code
     *
     * @return mixed
     */
    public function sendError($error, $code = 404)
    {
        return Response::json(ResponseUtil::makeError($error), $code);
    }

    /**
     * @param $message
     *
     * @return mixed
     */
    public function sendSuccess($message)
    {
        return Response::json([
            'success' => true,
            'message' => $message,
        ], 200);
    }
}
